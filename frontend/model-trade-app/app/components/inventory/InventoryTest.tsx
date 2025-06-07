'use client';
import React from 'react'
import { useEffect, useState } from "react";
import { ModelResponseDTO } from "@/app/dtos/response/ModelResponseDTO";
import ModelList from './ModelList';
const InventoryTestPage = () => {
    const [models, setModels] = useState<ModelResponseDTO[]>([]);

    useEffect(() => {
        const token =
            "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZXZubHUuY29tIiwic3ViIjoidHJ1b25ndGVzdDExMDYiLCJleHAiOjE3NDg2MDE5NzMsImlhdCI6MTc0ODUxNTU3M30.7Bz5arGvZO_yDi8X7rxgxeuezWjUM9NIXjMaCqDKGMLMA72oWXLjM08AsQ37JoFwvu6Ajsb9xwm4K_1m3dkDqA";
        console.log("Gọi API getAllModelByUser");
        fetch("http://localhost:8080/model_trade/api/model/getAllModelByUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            mode: 'cors',
            credentials: 'include',
        })
            .then((res) => res.json()) // ✅ gọi hàm
            .then((data) => {
                if (Array.isArray(data.result)) {
                    setModels(data.result);
                } else {
                    console.error("API không trả về result là mảng:", data);
                }
            })
            .catch((err) => console.error("Fetch failed:", err));
    }, []);




    return (
        <div className="p-4 space-y-4">
            <ModelList models={models} />
        </div>
    );
}

export default InventoryTestPage