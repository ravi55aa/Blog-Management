export enum AuthMessage {
    // Error messages
    EmailExists = 'User with email already exists',
    OtpExpired = 'OTP is expired',
    InvalidOtp = 'Invalid OTP',
    OtpNotVerified = 'OTP is not verified',
    InvalidCredentials = 'Invalid credentials',
    UserBlocked = 'Blocked',
    InvalidRefreshToken = 'Invalid refresh token',
    InvalidAccessToken = 'Invalid token',
    NoAccess = 'You have no access',
    InvalidCurrentPassword = 'Current password is invalid',
    passwordNotUpdated = 'Password not updated',
    InvalidUser = 'Invalid user type',
    UnAuthorized = ' Unauthorized. No user found',
    AccessDenied = 'Access denied. Insufficient permissions.',

    // Success messages
    OTPResent = 'OTP resent',
    not_Found = 'User not found',
    RegisterOtpSent = 'OTP sent to your email, verify to complete registration',
    UserRegistered = 'New user created',
    UserLoggedIn = 'Login successful',
    UserLoggedOut = 'User is logged out',
    ForgetPasswordOtpSent = 'OTP sent to your email, verify to reset password',
    OtpVerified = 'OTP is verified',
    PasswordReset = 'Password is updated',
    TokenRefreshed = 'Token refreshed',
}


export enum BlogMessage {
    BlogCreated = "Blog created successfully",
    BlogNotCreated = "Blog is not created",
    BlogUpdated = "Blog updated successfully",
    BlogNotUpdated = "Blog is not updated",
    BlogDeleted = "Blog deleted successfully",
    BlogNotDeleted = "Blog is not deleted",
    BlogNotFound = "Blog not found",
    BlogsFetched = "Blogs fetched successfully",
    BlogFetched = "Blog fetched successfully",
    InvalidBlogId = "Invalid blog id",
    InvalidBlogData = "Invalid blog data",
    UnauthorizedBlogAccess = "You are not authorized to access this blog"
}