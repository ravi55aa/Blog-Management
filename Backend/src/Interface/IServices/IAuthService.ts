export interface IAuthService {
    registerUser(name: string, email: string, password: string, role: string): Promise<{ accessToken: string; refreshToken: string }>;

    // loginUser(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
    // refreshAccessToken(refreshToken: string): Promise<string>;
    // logoutUser(refreshToken: string): Promise<void>;
}