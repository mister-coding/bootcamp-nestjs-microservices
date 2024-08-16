export default()=>({
    from:  process.env.MAIL_FROM || `"toko kelontong" <tokokelontong@gmail.com>`,
    transport: process.env.MAIL_SMTP || "smtp://mail:25"
})