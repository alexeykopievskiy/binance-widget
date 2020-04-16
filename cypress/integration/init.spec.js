describe('Filter pairs', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should accept input and have 0 length', () => {
    const input = "BNBR"
    cy.get('.ant-input')
      .type(input)
      .should('have.value', input)

    cy.get('.ant-table-row')
      .should('have.length', 0)
  })

  it('should accept input and have 1 length', () => {
    const input = "BNB"
    cy.get('.ant-input')
      .type(input)
      .should('have.value', input)

    cy.get('.ant-table-row')
      .should('have.length', 1)
  })

  it('should add pair to favourite', () => {
    cy.get('.ant-table-row .ant-checkbox-input')
      .first()
      .click()

    cy.get('.ant-radio-button-wrapper')
      .first()
      .click()

    cy.get('.ant-table-row')
      .should('have.length', 1)
  })
})