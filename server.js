const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'meekadha@gmail.com',
    pass: 'visk nmxv jnku fcmt'
  }
});

app.post('/send-story', async (req, res) => {
  const { story, senderName, senderInstagram, dedicationType, receiverName, receiverInstagram, anonymous } = req.body;
  
  await transporter.sendMail({
    from: 'meekadha@gmail.com',
    to: 'meekadha@gmail.com',
    subject: `New Story Submission from ${anonymous ? 'Anonymous' : senderName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%); border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="https://id-preview--7e2fa2a5-0050-4dd2-9dd1-10587486bfc8.lovable.app/images/mee-kadha-logo.jpeg" alt="MEE KADHA Logo" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover;" />
        </div>
        
        <h1 style="color: #880e4f; text-align: center; margin-bottom: 24px;">📽️ New Story Submission</h1>
        
        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
          <h2 style="color: #c2185b; margin-top: 0;">👤 Sender Details</h2>
          <p><strong>Name:</strong> ${anonymous ? 'Anonymous' : senderName}</p>
          <p><strong>Instagram:</strong> ${anonymous ? 'Hidden' : (senderInstagram || 'Not provided')}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
          <h2 style="color: #c2185b; margin-top: 0;">💝 Dedication</h2>
          <p><strong>Type:</strong> ${dedicationType === 'myself' ? 'For Myself' : 'For Someone Special'}</p>
          ${dedicationType === 'others' ? `
            <p><strong>Dedicated To:</strong> ${receiverName}</p>
            <p><strong>Receiver Instagram:</strong> ${receiverInstagram || 'Not provided'}</p>
          ` : ''}
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 12px;">
          <h2 style="color: #c2185b; margin-top: 0;">📖 The Story</h2>
          <p style="line-height: 1.8; white-space: pre-wrap;">${story}</p>
        </div>
        
        <p style="text-align: center; color: #880e4f; margin-top: 24px; font-style: italic;">MEE KADHA - Your Story, Our Lens 🎬</p>
      </div>
    `
  });
  
  res.json({ success: true });
});

app.listen(3001);
