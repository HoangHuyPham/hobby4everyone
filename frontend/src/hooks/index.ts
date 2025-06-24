import { NotificationContext } from "@/contexts/NotificationContext";
import { useContext } from "react";

export const useNotification = ()=>useContext(NotificationContext)