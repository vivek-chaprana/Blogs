export default function getAuthErrorMessages(error: string) {
  switch (error) {
    case "CredentialsSignin":
      return {
        title: "Invalid Credentials",
        message: "The username or password you entered is incorrect",
      };

    default:
      return {
        title: "Something went wrong",
        message: "An error occurred. Please try again",
      };
  }
}
