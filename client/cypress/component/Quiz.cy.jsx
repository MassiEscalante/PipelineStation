import Quiz from "../../src/components/Quiz";

describe("Quiz Component", () => {
  
  const mockQuestions = [
    {
      _id: "1",
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Trainer Marking Language", isCorrect: false },
        { text: "Hyper Text Markup Language", isCorrect: true },
        { text: "Hyperlinks and Text Markup Language", isCorrect: false },
        { text: "Home Tool Markup Language", isCorrect: false },
      ],
    },
    {
      _id: "2",
      question: "Which programming language is primarily used for web development?",
      answers: [
        { text: "Python", isCorrect: false },
        { text: "JavaScript", isCorrect: true },
        { text: "C++", isCorrect: false },
        { text: "Java", isCorrect: false },
      ],
    },
  ];

  it("should start the quiz and display the first question", () => {
    cy.mount(<Quiz questions={mockQuestions} />);
    cy.get("button").contains("Start Quiz").click();
    cy.get(".card").should("be.visible");
    cy.get("h2").should("contain.text", mockQuestions[0].question);
  });

  it("should answer questions and complete the quiz", () => {
    cy.mount(<Quiz questions={mockQuestions} />);
    cy.get("button").contains("Start Quiz").click();
    cy.get("button").contains("2").click(); // Correct answer for question 1
    cy.get("button").contains("2").click(); // Correct answer for question 2
    cy.get(".alert-success").should("be.visible").and("contain", "Your score: 2/2");
  });

  it("should restart the quiz after completion", () => {
    cy.mount(<Quiz questions={mockQuestions} />);
    cy.get("button").contains("Start Quiz").click();
    cy.get("button").contains("2").click(); // Correct answer for question 1
    cy.get("button").contains("2").click(); // Correct answer for question 2
    cy.get("button").contains("Take New Quiz").click();
    cy.get("button").contains("Start Quiz").should("be.visible");

  });

});