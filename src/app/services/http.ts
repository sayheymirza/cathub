import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class Http {
    public endpoint: string = "";

    private http = inject(HttpClient);

    public async request<T = any>(param: RequestParam) {
        if (window.localStorage.getItem('$endpoint')) {
            this.endpoint = window.localStorage.getItem('$endpoint')!;
        }

        let url = `${this.endpoint}${param.path}`;

        let headers: any = param.header ?? {};

        const token = window.localStorage.getItem('#cathub/token');

        headers['Authorization'] = 'Bearer ' + token;

        try {
            const result = await lastValueFrom(
                this.http
                    .request<T>(
                        new HttpRequest(param.method, url, param.data, {
                            headers: new HttpHeaders(headers),
                        })
                    )
                    .pipe(
                        filter((res) => 'type' in res && res.type == HttpEventType.Response),
                    )
            );

            return result;
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status == 401) {
                    window.localStorage.removeItem('#cathub/token');
                    window.location.reload();
                }

                return {
                    body: error.error
                };
            }

            return Promise.reject(error);
        }
    }

    public async upload(param: UploadParam): Promise<any> {
        if (window.localStorage.getItem('$endpoint')) {
            this.endpoint = window.localStorage.getItem('$endpoint')!;
        }

        const url = `${this.endpoint}/api/v1/upload`;

        let headers: any = {};
        const token = window.localStorage.getItem('#cathub/token');
        headers['Authorization'] = 'Bearer ' + token;

        // Create FormData
        const formData = new FormData();

        formData.append('file', param.file);


        const totalSize = param.file?.size;

        return new Promise((resolve, reject) => {
            const request = new HttpRequest('POST', url, formData, {
                headers: new HttpHeaders(headers),
                reportProgress: true
            });

            this.http.request(request).subscribe({
                next: (event) => {
                    switch (event.type) {
                        case HttpEventType.Sent:
                            if (param.onStart) {
                                param.onStart({
                                    total: totalSize,
                                    size: 0,
                                    percentage: 0
                                });
                            }
                            break;

                        case HttpEventType.UploadProgress:
                            if (event.total) {
                                const percentage = Math.round(100 * event.loaded / event.total);
                                if (param.onProgress) {
                                    param.onProgress({
                                        total: event.total,
                                        size: event.loaded,
                                        percentage
                                    });
                                }
                            }
                            break;

                        case HttpEventType.Response:
                            if (param.onComplete) {
                                param.onComplete({ body: event.body });
                            }

                            resolve({ body: event.body });
                            break;
                    }
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        window.localStorage.removeItem('#cathub/token');
                        window.location.reload();
                    }

                    if (param.onError) {
                        param.onError(error.error);
                    }

                    reject(error);
                }
            });
        });
    }
}

interface RequestParam {
    method: string;
    path?: string;
    data?: any;
    auth?: boolean;
    header?: object;
}

interface UploadParam {
    file: File;
    onStart?: (progress: UploadProgress) => void;
    onProgress?: (progress: UploadProgress) => void;
    onComplete?: (response: any) => void;
    onError?: (error: any) => void;
}

interface UploadProgress {
    total: number;
    size: number;
    percentage: number;
}
