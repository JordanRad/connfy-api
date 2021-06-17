import * as nodemailer from 'nodemailer';

export class EmailService {

    /**
     * Send an email
     */
    public static async sendMail(to:string,meetingId: number, userId: number) {
        function getHTMLContent(meetingId: number, userId: number): string {
            let htmlContent: string = `<!doctype html>
    <html>
    
    <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Email</title>
        <style>
            body{
                font-family: Arial, Helvetica, sans-serif;
            }
            .main{
                width: 100%;
                max-width: 100%;
            }
            .tbl{
                display: flex;
                justify-content: center;
                width: 90%;
                border: 3px solid #63aed9;
                border-radius: 20px;
                padding: 10px;
                margin: auto;
            }
            .buttons{
                display: flex;
                justify-content: center;
            }
            a{
                display: block;
                padding: 10px;
                color: white;
                text-decoration: none;
            }
            .btn-accept{
                background-color:#63aed9 ;
            }
            .btn-accept:hover{
                background-color:#315164 ;
            }
            
            .btn-cancel{
                background-color:#b90a0a ;
            }
            .btn-cancel:hover{
                background-color:#550606 ;
            }
            
        </style>
    </head>
    
    <body class="">
        <table class="tbl" border="0" cellpadding="0" cellspacing="0" class="body">
            <tr>
                <td>&nbsp;</td>
                <td class="container">
                    <div class="content">
                        <table class="main">
    
                            <!-- START MAIN CONTENT AREA -->
                            <tr>
                                <td class="wrapper">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <h1 align="center"> Meeting Invitation</h1>
                                                <h2 align="center">You were invited to join meeting 0021H524D</h2>
                                                <table border="0" cellpadding="0" cellspacing="0" class="buttons">
                                                    <tbody >
                                                        <tr>
                                                            <td>
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td > <a class="btn-cancel" href="http://localhost:3000/api/invites/${meetingId}/declinedBy/${userId}"
                                                                                    target="_blank">Won't be available</a></td>
                                                                            <td style="color: white; background-color: white;">&nbsp;&nbsp;</td>
                                                                            <td class="td-btn"> <a class="btn-accept" href="http://localhost:3000/api/invites/${meetingId}/acceptedBy/${userId}"
                                                                                    target="_blank">Accept meeting</a> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p>If you received this email by mistake, simply delete it. You won't be
                                                    subscribed if you don't click the confirmation link above.</p>
    
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
    
                            <!-- END MAIN CONTENT AREA -->
                        </table>
    
    
                        <!-- END CENTERED WHITE CONTAINER -->
                    </div>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </body>
    
    </html>`
            return htmlContent;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'connfyapi@gmail.com',
                pass: 'Qwerty1234$'
            }
        });

        let info = await transporter.sendMail({
            from: '"Connfy Meeting 👻" <connfyapi@gmail.com>',
            to: to,
            subject: "Meeting Invitation",
            html: getHTMLContent(meetingId,userId)
        });
        return info;
    }



}

