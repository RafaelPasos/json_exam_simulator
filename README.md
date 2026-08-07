# Exam Simulator

LIVE DEMO
https://rafaelpasos.github.io/json_exam_simulator/ 

A fast, beautiful, and completely client-side Exam Simulator. This web app allows you to upload custom question banks (via JSON), set your own parameters, and take practice exams with a smooth, native-feeling user experience. 

All data is processed locally in your browser. No databases, no sign-ups, and no servers required.

## Features

- **Custom Question Banks**: Upload any valid JSON file containing your custom questions.
- **Dynamic Question Slicing**: Choose exactly how many questions you want to take per session (e.g., 10, 20, 30, up to 60). The simulator will randomly shuffle your bank and slice exactly what you asked for.
- **Timer functionality**: Set a custom time limit for your exam. You can pause, resume, or reset the timer at any point.
- **Smooth Navigation**: Navigate through questions using the on-screen buttons, or simply double-click an option to instantly jump to the next question.
- **State Persistence**: Accidental refresh? No problem. Your progress, answers, and remaining time are automatically saved in your browser's local storage.
- **Detailed Results & Feedback**: When you finish, you are greeted with a beautiful dashboard containing your final score. Review every question you took, accompanied by correct/incorrect indicators and detailed justifications.
- **Native Animations**: Built with the modern View Transitions API for gorgeous, fluid morphing animations as you progress through the app.
- **Responsive Design**: A clean, distraction-free aesthetic that works flawlessly on desktop, tablets, and mobile devices.

## How to Use

1. **Host or Run Locally**: Since this is a static site, you can host it anywhere for free (like Netlify Drop or GitHub Pages), or simply run a local HTTP server in this directory (e.g., `python3 -m http.server 8080`).
2. **Upload a Question Bank**: Click the dropzone or drag-and-drop a `.json` question bank into the setup screen. (A `sample_exam.json` is provided in this repository to test with).
3. **Configure Settings**: Select the maximum amount of questions you want to be quizzed on, and set a time limit.
4. **Take the Exam**: Click "Start Exam". Answer questions as you go. You can pause the exam if you need a break, or click the "Reset" button to cancel completely.
5. **Review**: Submit the exam when you reach the end, or wait for the timer to run out. Review your score and the provided justifications to learn from your mistakes!

## Question Bank JSON Format

To create your own custom exams, you just need to format your questions into a `.json` file that matches the schema below. 

### Structure

Your JSON file should be an object containing a `title` string and a `questions` array. 

Each question in the array must have:
- `id`: A unique identifier (string or number).
- `text`: The actual question text.
- `options`: An array of possible answers (usually 4).
- `correctOptionId`: The `id` of the correct option.
- `justification`: (Optional but highly recommended) A string explaining *why* the answer is correct. This is displayed on the final results screen to aid learning.

### Example Schema

```json
{
  "title": "My Custom Practice Exam",
  "questions": [
    {
      "id": "q1",
      "text": "Which AWS service is used to decouple applications?",
      "options": [
        { "id": "a", "text": "Amazon SQS" },
        { "id": "b", "text": "Amazon EC2" },
        { "id": "c", "text": "Amazon S3" },
        { "id": "d", "text": "AWS IAM" }
      ],
      "correctOptionId": "a",
      "justification": "Amazon Simple Queue Service (SQS) is a message queuing service that allows you to decouple and scale microservices."
    }
  ]
}
```

Make sure the `correctOptionId` perfectly matches one of the `id` values provided in the `options` array!


<img width="1470" height="750" alt="image" src="https://github.com/user-attachments/assets/b6ecd3b7-36f8-4b0b-a07d-18c1ed8420ca" />

<img width="1470" height="750" alt="image" src="https://github.com/user-attachments/assets/5334b4e0-2b2f-4602-99e4-9f4713d2a0b9" />

<img width="1470" height="750" alt="image" src="https://github.com/user-attachments/assets/3c7c5dbf-c003-425f-ad7f-e04b70f1ef3b" />

<img width="1470" height="750" alt="image" src="https://github.com/user-attachments/assets/857366a3-2ba1-466c-9641-4398f7202bd9" />

<img width="1470" height="750" alt="image" src="https://github.com/user-attachments/assets/9e5d6e9f-1956-4d35-aa44-4375d82dc3d7" />

<img width="1470" height="750" alt="image" src="https://github.com/user-attachments/assets/1121f143-29b5-4cb9-b4d5-636e64318cb2" />

<img width="1470" height="750" alt="image" src="https://github.com/user-attachments/assets/640de981-16f1-4480-a0b8-0e08d89e6d85" />



