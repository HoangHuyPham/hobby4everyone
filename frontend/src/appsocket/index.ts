import { INotification, NOTIFICATION_ACTION, NotificationAction } from "@/contexts/NotificationContext";
import Cookies from "js-cookie";
import { Dispatch } from "react";
import { toast } from "react-toastify";

export class AppSocket {
    private static _instance: AppSocket;
    socket: WebSocket | undefined;
    dispatchNotification: Dispatch<NotificationAction>;

    constructor() {
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new AppSocket();
        }
        return this._instance;
    }

    init(url: string, _dispatchNotification: Dispatch<NotificationAction>) {
        this.dispatchNotification = _dispatchNotification;
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log("socket connected");
            this.fetchNotification(); // ✅ gọi sau khi đã gán xong
        };

        this.socket.onclose = (e) => {
            console.log(`socket closed: ${e}`);
        };

        this.socket.onerror = (error) => {
            console.error("socket error:", error);
        };

        this.socket.onmessage = (message) => {
            if (message.data === "update") {
                this.fetchNotification();
                toast.info("Có thông báo mới");
            }
        };
    }


    async fetchNotification() {
        try {
            const token = Cookies.get("token");
            const resp = await fetch("http://localhost:8080/model_trade/api/notifications/self", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                mode: "cors",
                credentials: "include",
            });

            this.dispatchNotification({
                type: NOTIFICATION_ACTION.CLEAR,
                payload: null,
            });

            const data = await resp.json();
            if (data?.code === 200) {
                const results: INotification[] = data.result;

                this.dispatchNotification({
                    type: NOTIFICATION_ACTION.ADD,
                    payload: results,
                });

                return true;
            } else {
                alert(`Lỗi: ${data?.message}`);
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    }
}
