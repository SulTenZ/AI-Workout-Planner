// app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/lib/auth"; // Impor handlers yang sudah jadi

export const { GET, POST } = handlers;
