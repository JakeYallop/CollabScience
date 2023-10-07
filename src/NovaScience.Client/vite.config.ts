import { loadEnv } from "vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
    const vars = loadEnv(mode, process.cwd(), "SSL");
    return {
        server: {
            open: true,
            https: {
                key: vars.SSL_KEY_FILE,
                cert: vars.SSL_CRT_FILE,
            },
            port: 5173,
            proxy: {
                ...["*"].reduce((prev, curr) => {
                    prev[curr] = {
                        target: "https://localhost:7048",
                        ws: true,
                        secure: true,
                    };
                    return prev;
                }, {}),
            },
        },
    };
});
