import { authOptions } from "@/lib/auth/auth-options";
import { COMPANY_NAME, WEBAPP_URL } from "@/lib/constants";
import { getServerSession } from "next-auth";

type InputType = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function ContactFormSubmissionAdminEmail(data: InputType) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const { name, email, subject, message } = data;

  return `<!DOCTYPE html>
  <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
  
  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <style>
      td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
    </style>
    <![endif]-->
    <title>New Contact Form Submission</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" media="screen">
    <style>
      img {
        max-width: 100%;
        vertical-align: middle;
        line-height: 100%;
        border: 0
      }
  
      .hover-bg-slate-100:hover {
        background-color: #F7F8FA !important
      }
  
      .hover-bg-primary-600:hover {
        background-color: #003CDF !important
      }
  
      .hover-text-slate-600:hover {
        color: #585E83 !important
      }
  
      .hover-text-primary-600:hover {
        color: #003CDF !important
      }
  
      @media (prefers-color-scheme: dark) {
        .dark-bg-gray-800 {
          background-color: #1E1E1E !important
        }
  
        .dark-bg-gray-900 {
          background-color: #121212 !important
        }
  
        .dark-bg-gray-50 {
          background-color: #f9fafb !important
        }
  
        .dark-bg-gray-600 {
          background-color: #272727 !important
        }
  
        .dark-text-gray-200 {
          color: #ABABAB !important
        }
  
        .dark-text-gray-50 {
          color: #f9fafb !important
        }
  
        .dark-text-gray-800 {
          color: #1E1E1E !important
        }
  
        .dark-text-gray-900 {
          color: #121212 !important
        }
  
        .dark-text-primary-500 {
          color: #0047FF !important
        }
  
        .dark-text-primary-200 {
          color: #94B5FF !important
        }
  
        .dark-hover-bg-gray-50:hover {
          background-color: #f9fafb !important
        }
  
        .dark-hover-text-gray-100:hover {
          color: #D5D5D5 !important
        }
  
        .dark-hover-text-primary-100:hover {
          color: #C6D9FF !important
        }
      }
  
      @media (max-width: 648px) {
        .sm-mt-0 {
          margin-top: 0 !important
        }
  
        .sm-block {
          display: block !important
        }
  
        .sm-hidden {
          display: none !important
        }
  
        .sm-h-px {
          height: 1px !important
        }
  
        .sm-w-full {
          width: 100% !important
        }
  
        .sm-py-3 {
          padding-top: 12px !important;
          padding-bottom: 12px !important
        }
  
        .sm-px-0 {
          padding-left: 0 !important;
          padding-right: 0 !important
        }
  
        .sm-px-6 {
          padding-left: 24px !important;
          padding-right: 24px !important
        }
  
        .sm-leading-10 {
          line-height: 40px !important
        }
      }
    </style>
  </head>
  
  <body class="dark-bg-gray-900"
    style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #F7F8FA">
    <div style="display: none">
      Let's get you signed in
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847;
    </div>
    <div role="article" aria-roledescription="email" aria-label="Let's get you signed in" lang="en"
      style="font-size: 16px; font-size: 1rem; font-size: max(16px, 1rem)">
      <table style="width: 100%; font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <!--[if mso]>
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="height:300px; mso-width-percent: 1000; position: absolute; left: -10px; top: -20px; z-index: -1;">
              <v:fill type="tile" color="#dee2e9" />
              <v:textbox inset="0,0,0,0">
            <![endif]-->
            <div style="max-height: 40px">
              <div class="dark-bg-gray-900" style="height: 300px; background-color: #DEE2E9"></div>
            </div>
            <!--[if mso]>
              </v:textbox>
            </v:rect>
            <![endif]-->
            <table class="sm-w-full" style="position: relative; max-height: 0; width: 568px; opacity: 0.999"
              cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="vertical-align: top" valign="top">
                  <div class="sm-px-6">
                    <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td class="sm-px-6" style="padding-left: 40px; padding-right: 40px">
                          <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td>
                                <a href=${WEBAPP_URL} class="dark-text-gray-50"
                                  style="text-decoration: none; font-weight: 700; color: #191847">
                                  ${COMPANY_NAME}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <div role="separator" style="line-height: 40px">&zwnj;</div>
                    <table class="dark-bg-gray-600"
                      style="width: 100%; border-radius: 8px; background-color: #fff; box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)"
                      cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td class="sm-px-6" style="padding: 40px">
                          <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td>
                                <h1 class="dark-text-gray-50"
                                  style="margin: 0; font-size: 30px; font-weight: 700; line-height: 1; letter-spacing: -0.025em; color: #191847">
                                  We recieved a new contact form submission in ${COMPANY_NAME}
                                </h1>
                                <div role="separator" style="line-height: 24px">
                                  &zwnj;
                                </div>
                                <p class="dark-text-gray-50"
                                  style="margin: 0; font-size: 16px; line-height: 26px; color: #191847">
                                  Please check the request and take necessary action. Below are the details of the report.
                                  <br>
                                  <br>
                                  <strong>Name:</strong> ${name}
                                  <br>
                                  <strong>Email</strong> ${email}
                                  <br>
                                  <strong>Subject:</strong> ${subject}
                                  <br>
                                  <strong>Message:</strong> ${message}
                                  <br>
                                </p>
                                <br /><br /><br /><br />
                               ${
                                 user
                                   ? ` <p class="dark-text-gray-50"
                                style="margin: 0; font-size: 16px; line-height: 26px; color: #191847">
                                Recieved from below account
                                <br>
                                <strong>Name:</strong> ${user?.name}
                                <br>
                                <strong>Email</strong> ${user?.email}
                                <br>
                                <strong>Username:</strong> ${user?.username}
                                <br>
                                <strong>Verified:</strong> ${user?.emailVerified}
                                <br>
                                <strong>
                                  <a href="${WEBAPP_URL}/${user?.username}" class="dark-text-primary-500 hover-text-primary-600"
                                    style="text-decoration: none; color: #0047FF">
                                    View Account
                                  </a>
                                </strong>
                              </p>`
                                   : `<p>User not signed in.</p>`
                               }
                              </td>
                            </tr>
                            <tr role="separator">
                              <td style="line-height: 24px">&zwnj;</td>
                            </tr>
                      </tr>
                    </table>
                </td>
              </tr>
            </table>
    </div>
    </td>
    </tr>
    </table>
    <div class="sm-leading-10" role="separator" style="line-height: 64px">&zwnj;</div>
    </td>
    </tr>
    </table>
    </div>
  </body>
  
  </html>`;
}

export function ContactFormSubmissionUserEmail(data: InputType) {
  const { name } = data;
  return `<!DOCTYPE html>
  <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
  
  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <style>
      td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
    </style>
    <![endif]-->
    <title>We received your message will get back to you soon</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" media="screen">
    <style>
      img {
        max-width: 100%;
        vertical-align: middle;
        line-height: 100%;
        border: 0
      }
  
      .hover-bg-slate-100:hover {
        background-color: #F7F8FA !important
      }
  
      .hover-bg-primary-600:hover {
        background-color: #003CDF !important
      }
  
      .hover-text-slate-600:hover {
        color: #585E83 !important
      }
  
      .hover-text-primary-600:hover {
        color: #003CDF !important
      }
  
      @media (prefers-color-scheme: dark) {
        .dark-bg-gray-800 {
          background-color: #1E1E1E !important
        }
  
        .dark-bg-gray-900 {
          background-color: #121212 !important
        }
  
        .dark-bg-gray-50 {
          background-color: #f9fafb !important
        }
  
        .dark-bg-gray-600 {
          background-color: #272727 !important
        }
  
        .dark-text-gray-200 {
          color: #ABABAB !important
        }
  
        .dark-text-gray-50 {
          color: #f9fafb !important
        }
  
        .dark-text-gray-800 {
          color: #1E1E1E !important
        }
  
        .dark-text-gray-900 {
          color: #121212 !important
        }
  
        .dark-text-primary-500 {
          color: #0047FF !important
        }
  
        .dark-text-primary-200 {
          color: #94B5FF !important
        }
  
        .dark-hover-bg-gray-50:hover {
          background-color: #f9fafb !important
        }
  
        .dark-hover-text-gray-100:hover {
          color: #D5D5D5 !important
        }
  
        .dark-hover-text-primary-100:hover {
          color: #C6D9FF !important
        }
      }
  
      @media (max-width: 648px) {
        .sm-mt-0 {
          margin-top: 0 !important
        }
  
        .sm-block {
          display: block !important
        }
  
        .sm-hidden {
          display: none !important
        }
  
        .sm-h-px {
          height: 1px !important
        }
  
        .sm-w-full {
          width: 100% !important
        }
  
        .sm-py-3 {
          padding-top: 12px !important;
          padding-bottom: 12px !important
        }
  
        .sm-px-0 {
          padding-left: 0 !important;
          padding-right: 0 !important
        }
  
        .sm-px-6 {
          padding-left: 24px !important;
          padding-right: 24px !important
        }
  
        .sm-leading-10 {
          line-height: 40px !important
        }
      }
    </style>
  </head>
  
  <body class="dark-bg-gray-900"
    style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #F7F8FA">
    <div style="display: none">
      Let's get you signed in
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847;
    </div>
    <div role="article" aria-roledescription="email" aria-label="Let's get you signed in" lang="en"
      style="font-size: 16px; font-size: 1rem; font-size: max(16px, 1rem)">
      <table style="width: 100%; font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <!--[if mso]>
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="height:300px; mso-width-percent: 1000; position: absolute; left: -10px; top: -20px; z-index: -1;">
              <v:fill type="tile" color="#dee2e9" />
              <v:textbox inset="0,0,0,0">
            <![endif]-->
            <div style="max-height: 40px">
              <div class="dark-bg-gray-900" style="height: 300px; background-color: #DEE2E9"></div>
            </div>
            <!--[if mso]>
              </v:textbox>
            </v:rect>
            <![endif]-->
            <table class="sm-w-full" style="position: relative; max-height: 0; width: 568px; opacity: 0.999"
              cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="vertical-align: top" valign="top">
                  <div class="sm-px-6">
                    <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td class="sm-px-6" style="padding-left: 40px; padding-right: 40px">
                          <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td>
                                <a href=${WEBAPP_URL} class="dark-text-gray-50"
                                  style="text-decoration: none; font-weight: 700; color: #191847">
                                  ${COMPANY_NAME}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <div role="separator" style="line-height: 40px">&zwnj;</div>
                    <table class="dark-bg-gray-600"
                      style="width: 100%; border-radius: 8px; background-color: #fff; box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)"
                      cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td class="sm-px-6" style="padding: 40px">
                          <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td>
                                <h1 class="dark-text-gray-50"
                                  style="margin: 0; font-size: 30px; font-weight: 700; line-height: 1; letter-spacing: -0.025em; color: #191847">
                                  We received your message will get back to you soon.
                                </h1>
                                <div role="separator" style="line-height: 24px">
                                  &zwnj;
                                </div>
                                <p class="dark-text-gray-50"
                                  style="margin: 0; font-size: 16px; line-height: 26px; color: #191847">
  
                                  Hi ${name},
                                  <br>
  
                                  We received your message will get back to you soon. Our team will contact you within 24
                                  hours. If you have any questions, feel free to
                                  contact us. Thank you for contacting us.
                                  <br>
                                  <br>
                                  <strong>
                                    <a href=${WEBAPP_URL}>Visit ${COMPANY_NAME}</a>
                                  </strong>
                                  <br><br>
                                  You can check our help and faqs page for more information in the meantime.
                                  <br>
                                  <a href="${WEBAPP_URL}/help" style="margin-right: 20px;">Help </a>
                                  <a href="${WEBAPP_URL}/faqs">FAQs </a>
                                  <br>
                                </p>
                              </td>
                            </tr>
                            <tr role="separator">
                              <td style="line-height: 24px">&zwnj;</td>
                            </tr>
                      </tr>
                    </table>
                </td>
              </tr>
            </table>
    </div>
    </td>
    </tr>
    </table>
    <div class="sm-leading-10" role="separator" style="line-height: 64px">&zwnj;</div>
    </td>
    </tr>
    </table>
    </div>
  </body>
  
  </html>`;
}
