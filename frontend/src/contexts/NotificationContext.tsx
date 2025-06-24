import { createContext, Dispatch, ReactNode, Reducer, useReducer } from "react";

interface INotification {
    id: string,
    title: string,
    content: string,
    read: boolean,
    createdAt: Date,
    target: IUser
}

interface IUser {
    userId: string;
    userName: string;
    email: string;
    name: string;
    phoneNumber: string;
    dateOfBirth: string;
    createdDate: string;
    role: string;
    active: string;
    isDelete: boolean;
}

interface NotificationType {
    notifications: INotification[],
    dispatchNotification: Dispatch<NotificationAction>
}

interface NotificationAction {
    type: string,
    payload: INotification | null,
}

const NOTIFICATION_ACTION = {
    ADD: "add",
    REMOVE: "remove",
    CLEAR: "clear",
    UPDATE: "update"
}

const NotificationContext = createContext<NotificationType>({} as NotificationType)

const NotificationReducer: Reducer<INotification[], NotificationAction> = (state, action) => {
    switch (action.type) {
        case NOTIFICATION_ACTION.ADD: {
            const newNotifications = Array.isArray(action.payload)
                ? action.payload
                : [action.payload];
            return [...state, ...newNotifications];
        }

        case NOTIFICATION_ACTION.UPDATE: {
            return state.map((n) =>
                n.id === action.payload?.id ? action.payload : n
            );
        }

        case NOTIFICATION_ACTION.REMOVE:
            return state.filter((n) => n.id !== action.payload?.id);

        case NOTIFICATION_ACTION.CLEAR:
            return [];

        default:
            return state;
    }
}

const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, dispatchNotification] = useReducer(NotificationReducer, [])

    return <NotificationContext.Provider value={{ notifications, dispatchNotification }}>
        {children}
    </NotificationContext.Provider>
}

export {
    NotificationProvider,
    NotificationContext,
    // eslint-disable-next-line react-refresh/only-export-components
    NOTIFICATION_ACTION
}

export type {
    INotification,
    NotificationAction
}