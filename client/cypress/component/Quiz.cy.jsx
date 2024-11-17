import Quiz from "../../src/components/Quiz";

describe("Quiz Component", () => {
  const mockQuestions = [
    {
      id: 1,
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Trainer Marking Language", isCorrect: false },
        { text: "Hyper Text Markup Language", isCorrect: true },
        { text: "Hyperlinks and Text Markup Language", isCorrect: false },
        { text: "Home Tool Markup Language", isCorrect: false },
      ],
    },
    {
      id: 2,
      question: "Which programming language is primarily used for web development?",
      answers: [
        { text: "Python", isCorrect: false },
        { text: "JavaScript", isCorrect: true },
        { text: "C++", isCorrect: false },
        { text: "Java", isCorrect: false },
      ],
    },
  ];

  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/questions/random",
      },
      {
        fixture: "questions.json",
        statusCode: 200,
      }
    ).as("getRandomQuestion");
  });

  it("should start the quiz and display the first question", () => {
    cy.mount(<Quiz questions={mockQuestions} />); // Pass mock questions as props
    cy.get("button").contains("Start Quiz").click();
    cy.get(".card").should("be.visible");
    cy.get("h2").should("not.be.empty");
  });

  it("should answer questions and complete the quiz", () => {
    cy.mount(<Quiz questions={mockQuestions} />); // Pass mock questions as props
    cy.get("button").contains("Start Quiz").click();

    // Answer questions
    cy.get("button").contains("1").click();

    // Verify the quiz completion
    cy.get(".alert-success").should("be.visible").and("contain", "Your score");
  });

  it("should restart the quiz after completion", () => {
    cy.mount(<Quiz questions={mockQuestions} />); // Pass mock questions as props
    cy.get("button").contains("Start Quiz").click();

    // Answer questions
    cy.get("button").contains("1").click();

    // Restart the quiz
    cy.get("button").contains("Take New Quiz").click();

    // Verify the quiz is restarted
    cy.get(".card").should("be.visible");
    cy.get("h2").should("not.be.empty");
  });
});