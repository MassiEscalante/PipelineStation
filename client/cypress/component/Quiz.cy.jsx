import Quiz from "../../src/components/Quiz";

describe("Quiz Component", () => {
  const mockQuestions = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
      answer: "Hyper Text Markup Language",
    },
    {
      id: 2,
      question: "Which programming language is primarily used for web development?",
      options: ["Python", "JavaScript", "C++", "Java"],
      answer: "JavaScript",
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

    // Answer all questions
    mockQuestions.forEach(() => {
      cy.get("button").contains("1").click();
    });

    // Verify the quiz completion
    cy.get(".alert-success", { timeout: 5000 }).should("be.visible").and("contain", "Your score");
  });

  it("should restart the quiz after completion", () => {
    cy.mount(<Quiz questions={mockQuestions} />); // Pass mock questions as props
    cy.get("button").contains("Start Quiz").click();

    // Answer all questions
    mockQuestions.forEach(() => {
      cy.get("button").contains("1").click();
    });

    // Restart the quiz
    cy.get("button").contains("Take New Quiz", { timeout: 5000 }).click();

    // Verify the quiz is restarted
    cy.get(".card").should("be.visible");
    cy.get("h2").should("not.be.empty");
  });
});