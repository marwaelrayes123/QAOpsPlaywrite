Feature: Ecommerce validations

  @Validation
  @foo
  Scenario: Placing the order
    Given a login to Ecommerce2 application with "<user>" and "<pass>"
    Then Verify Error message is displayed
    Examples:
      | user                | pass        |
      | rahulshetty         | learning111 |
      | nany                | lolo |