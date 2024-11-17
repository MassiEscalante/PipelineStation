import Quiz from "../../src/components/Quiz";

describe("Quiz Component", () => {
  const mockQuestions = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Trainer Marking Language",
        "Hyper Text Markup Language",
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language",
      ],
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
        body: mockQuestions,
        statusCode: 200,
      }
    ).as("getRandomQuestion");
  });

  it("should start the quiz and display the first question", () => {
    cy.mount(<Quiz questions={mockQuestions} />);
    cy.get("button").contains("Start Quiz").click();
    cy.get(".card").should("be.visible");
    cy.get("h2").should("contain", "What does HTML stand for?");
  });

  it("should answer questions and complete the quiz", () => {
    cy.mount(<Quiz questions={mockQuestions} />);
    cy.get("button").contains("Start Quiz").click();

    // Answer the first question correctly
    cy.get("button").contains("2").click(); // Correct answer
    cy.get(".alert-success")
      .should("be.visible")
      .and("contain", "Your score: 2/2");
  });

  it("should restart the quiz after completion", () => {
    cy.mount(<Quiz questions={mockQuestions} />);
    cy.get("button").contains("Start Quiz").click();

    // Complete the quiz
    cy.get("button").contains("2").click(); // First question
    cy.get("button").contains("2").click(); // Second question

    // Restart the quiz
    cy.get("button").contains("Take New Quiz").click();
    cy.get(".card").should("be.visible");
    cy.get("h2").should("contain", "What does HTML stand for?");
  });
});