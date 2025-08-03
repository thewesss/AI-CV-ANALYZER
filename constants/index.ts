export const resumes: Resume[] = [
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "2",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "3",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "4",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "5",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "6",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
];

export const AIResponseFormat = `{
      "overallScore": 0,
      "ATS": {
        "score": 0,
        "tips": [
          { "type": "improve", "tip": "example tip" }
        ]
      },
      "toneAndStyle": {
        "score": 0,
        "tips": [
          { "type": "improve", "tip": "example tip", "explanation": "detailed explanation here" }
        ]
      },
      "content": {
        "score": 0,
        "tips": [
          { "type": "improve", "tip": "example tip", "explanation": "detailed explanation here" }
        ]
      },
      "structure": {
        "score": 0,
        "tips": [
          { "type": "improve", "tip": "example tip", "explanation": "detailed explanation here" }
        ]
      },
      "skills": {
        "score": 0,
        "tips": [
          { "type": "improve", "tip": "example tip", "explanation": "detailed explanation here" }
        ]
      }
    }`;


export const prepareInstructions = ({ jobTitle, jobDescription }: { jobTitle: string; jobDescription: string; }) =>
    `You are an expert resume analyst. Your task is to analyze the provided resume against the given job description and return a JSON object.

      **CRITICAL INSTRUCTIONS:**
      1.  **ONLY** return a single, valid JSON object. Do not include any text, explanations, or markdown backticks before or after the JSON.
      2.  The JSON object's structure **MUST** strictly follow the format provided below. Do not add, remove, or rename any keys.
      3.  Categorize all your findings (strengths, weaknesses, suggestions) into the appropriate sections within the JSON ('ATS', 'toneAndStyle', 'content', 'structure', 'skills').
      4.  Every 'score' must be an integer between 0 and 100.
      5.  The 'overallScore' should be a weighted average of the other category scores.
      6.  If the resume is weak, give it a low score. Be critical and honest to help the user improve.

      The user is applying for the job of:
      - **Job Title:** ${jobTitle}
      - **Job Description:** ${jobDescription}

      **MANDATORY JSON FORMAT:**
      ${AIResponseFormat}
      
      Begin your response now with the opening '{' of the JSON object.`;

