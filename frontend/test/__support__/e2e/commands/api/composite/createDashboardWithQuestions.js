import { cypressWaitAll } from "__support__/e2e/cypress";

Cypress.Commands.add(
  "createDashboardWithQuestions",
  ({ dashboardName, questions }) => {
    return cy
      .createDashboard({ name: dashboardName })
      .then(({ body: dashboard }) => {
        return cypressWaitAll(
          questions.map(query =>
            cy.createQuestionAndAddToDashboard(query, dashboard.id),
          ),
        ).then(questions => {
          return {
            questions,
            dashboard,
          };
        });
      });
  },
);