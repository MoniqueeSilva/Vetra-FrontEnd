import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

export default function ProtectedRoute({ children }) {
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        let ativo = true;

        async function verificarSessao() {
            try {
                const response = await api.get("/me");

                if (ativo && response.data.success) {
                    setAutenticado(true);
                }
            } catch (error) {
                if (ativo) {
                    setAutenticado(false);
                }
            } finally {
                if (ativo) {
                    setCarregando(false);
                }
            }
        }

        verificarSessao();

        return () => {
            ativo = false;
        };
    }, []);

    if (carregando) {
        return <p>Verificando autenticação...</p>;
    }

    if (!autenticado) {
        return <Navigate to="/" replace />;
    }

    return children;
}
