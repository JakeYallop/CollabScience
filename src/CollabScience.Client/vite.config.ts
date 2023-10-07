import { loadEnv } from "vite";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
    const vars = loadEnv(mode, process.cwd(), "SSL");
    return {
        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html'),
                    presentation: resolve(__dirname, 'presentation/index.html'),
                },
            },
        },
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
