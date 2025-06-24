import { toast } from "react-toastify";

export class AppSocket {
    private static _instance : AppSocket;
    socket: WebSocket | undefined

    constructor(){}

    public static getInstance(){
        if (!this._instance){
            this._instance = new AppSocket()
        }
        return this._instance
    }

    init(url: string) {
        this.socket = new WebSocket(url)
        this.socket.onopen = () => {
            console.log("socket connected")
        }

        this.socket.onclose = (e) => {
            console.log(`socket closed: ${e}`)
        }

        this.socket.onerror = (error) => {
            console.error("socket error:", error);
        };

        this.socket.onmessage = (message) => {
            try {
                toast.info(message?.data)
            } catch (e) {
                console.error(e)
            }
        };
    }
}