import { type NextRequest, NextResponse } from "next/server";
// import { isAuthenticated } from "@lib/auth";

const isAuthenticated = () => {
	return false;
};

export const config = {
	matcher: "/api/:function*",
};

export function middleware(_request: NextRequest) {
	if (!isAuthenticated()) {
		return new NextResponse(JSON.stringify({ success: false, message: "authentication failed" }), {
			status: 401,
			headers: { "content-type": "application/json" },
		});
	}
}
