console.log("remote script initiated");
var emailTemplates = [
			{topic:"Apologize For Problem/Bug", subject: "I'm sorry! We're aware of your problem and working to fix it.", body:"I just saw your email. <br><br>Yikes! I'm so sorry you've been having problems. <br><br>I'm going to investigate what's going on and get back to you. <br><br>We'll make sure this gets fixed ASAP. <br><br>In the meantime, let me know if there's anything I can do to make sure you have an awesome experience.", tags:"sorry, express regret, be apologetic, make an apology, ask forgiveness, ask for pardon" },
			{topic:"Apply For Position", subject: "Available to help - please read", body:"I was told you're looking for someone to handle some specific challenges in your business. <br><br>I wanted to introduce myself and let you know I'm uniquely suited to solving these problems for you. <br><br>Here's a link with more about me and my experience. <br><br><b>http://www.MY-AWESOME-WEBSITE.com</b> <br><br>When you have time this week, I'd love to have a quick chat for you to assess if we would be a good fit working together. <br><br>What's your availability for a short call?", tags:"job application"}, 
			{topic:"Ask A Question", subject: "Can I ask you a question?", body:"I just wanted to ask you a quick question. <br><br><b>[INSERT QUESTION HERE]</b> <br><br>I appreciate your insight on this. Thanks."}, 
			{topic:"Break Up With Someone", subject: "I'm sorry. Please read this.", body:"I know this is inconsiderate for me to do by email, but I need to tell you something important, and it's hard for me to say in person. <br><br>I think we should see other people. <br><br>This is a life decision I needed to make for myself. Please don't take this upon yourself, wonder what you could have done differently, or think you're less of a person because of this. <br><br>You're truly a great person, and I've sincerely enjoyed the time we've spent together. <br><br>I don't regret us being together at all. This is a decision I need to make, and I'm sorry if it hurts you. This is something I simply need to do. <br><br>I hope this break will be amicable for the both of us. If you're upset, I understand. I wish no ill will towards you, and I hope you find happiness.", tags:"inquire, query,request"},
			{topic:"Cancel Service and Get A Refund", subject: "Cancel and refund", body:"I want to cancel this service ASAP <br><br>Please refund any and all charges. <br><br>Thank You", tags:"separate, part, part company, divorce, dump"}, 
			{topic:"Following Up", subject: "Following up", body:"I just wanted to follow up with you. <br><br>I sent you an email a little while ago. I wanted to check up on that conversation and see how things are going with you now. <br><br>Just to refresh your memory, I emailed you about <b>[ DESCRIBE IN A SENTENCE THE MAIN POINT OF THE PREVIOUS EMAIL ]</b> <br><br>Let me know if there's anything I can do to help you!", tags:"repayment, reimbursement, rebate"}, 
			{topic:"Received Task, Will Do Later", subject: "Got it. Thanks", body:"Just a heads up: I'm extremely busy right now, so it will take me some time to get to this.<br><br>Please remind me again if I don't get to this soon.<br><br>Also, let me know if your priorities change, and you no longer need this finished.",tags:" "}, 
			{topic:"Grant a refund", subject: "Your refund has been granted.", body:"I just received your request for a refund.<br><br>I'm sorry we didn't live up to your expectations.<br><br>I've completely refunded your charge. It will show up as a credit in your bank statement.<br><br>Let me know if I can assist you further, and I hope you have a great day.", tags:"repayment, reimbursement, rebate"}, 
			{topic:"Its been a while, lets catch up", subject: "It's been a while, let's catch up", body:"It's been awhile since we've last talked!<br><br>How are you?<br><br>I just wanted to catch up with you and see how you're doing.<br><br>Hit me back, and let me know what's happened since we last talked. I'd love to catch up.", tags:"reconnect"}, 
			{topic:"Need advice", subject: "Need Advice", body:"Hi. I need your help with something, if you don't mind.<br><br>I've been having trouble <b>[ DESCRIBE YOUR PROBLEM ]</b><br><br>Do you have any general or specific advice on this?<br><br>Any thoughts you have would be deeply appreciated.", tags:"guidance, counseling, counsel, help, direction"}, 
			{topic:"Not Interested, Sorry ", subject: "Thanks for the offer", body:"I appreciate the thought and energy you put into offering me <b>[ INSERT THING YOU ARE DECLINING ]</b><br><br>That being said, this isn't a fit for me right now. Later, if it does become a fit, I'll let you know.<br><br>Keep sending stuff my way, though. I appreciate the thought.", tags:"regretful, apologetic"}, 
			{topic:"Pay Back", subject: "Quick reminder - money owed", body:"I just wanted to let you know you owe me <b>[ AMOUNT OF MONEY OWED ]</b><br><br>It's easy to forget about these things, so I wanted to send you a quick reminder.<br><br>Let me know your preferred way of sending me money. I'm flexible, so whatever is most convenient for you.<br><br>Thanks!", tags:"money"}, 
			{topic:"Reschedule Appointment", subject:"Apologies - must reschedule", body: "I'm very sorry - something has come up in the last minute.<br><br>I'm going to need to reschedule our appointment.<br><br>Let me know your availability. I will try to accommodate your schedule.<br><br>Again, sorry for the change of plans.", tags:"delay, defer, postpone, adjourn, shelve"}, 
			{topic:"Schedule A Call", subject:"Call this week?", body: "Let's get on a short call to talk about <b>[ INSERT WHAT YOU WANT TO TALK ABOUT ]</b><br><br>What's your availability like this week?<br><br>Thanks. I'm looking forward to our discussion!", tags:"plan, program, timetable, scheme"}, 
			{topic:"Sick and staying home from work", subject: "At Home Today", body:"Due to illness, I'm going to be working at home today.<br><br>I'll be available through all standard channels (email, phone, etc.)<br><br>Please keep me in the loop. Thanks.", tags:" "}, 
			{topic:"Thanks For Calling", subject:"Thanks for the phone call!", body: "I noticed you called. I appreciate you reaching out to me.<br><br>I'll make sure to get back to you soon.<br><br>If you'd like a faster response, I'm a little quicker over email.<br><br>Reply with the main point of your call, and we can hash it out here.<br><br>Thanks! Hope your day is going well!", tags:"gratitude, appreciation"}, 
			{topic:"Thanks for sharing that email with me", subject:"Thanks for the share.", body: "Nice!<br><br>Thanks for sharing that link with me.<br><br>I enjoyed opening my email and seeing that.", tags:"gratitude, appreciation"}, 
			{topic:"Unsubscribe aggressively", subject:"Please unsubscribe me immediately.", body:"I have tried to unsubscribe from your email list on multiple occasions, and it's not working.<br><br>Please manually remove me from this list ASAP. Remove me from any corresponding lists as well.<br><br>I will start marking as spam any emails I receive from here on out.<br><br>Thank you.", tags:" "}, 
			{topic:"Unsubscribe politely", subject:"Service no longer needed.", body: "I'm sorry. This service is no longer a fit for me.<br><br>Will you please cancel this service for my account? I really appreciate it.<br><br>Thank you.", tags:" "}];