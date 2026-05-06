Feature: Ecommerce validations

  @Regression
  Scenario Outline: Placing the order
    Given a login to Ecommerce application with "<UserName>" and "<Password>"
    When  Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the order
    Then Verify odrer in present in the OrderHistory
    Examples:
        | UserName                | Password   |
        | marwa.elrayes@gmail.com | RY525279me!| 

        
  @Validation
  Scenario: Placing the order
    Given a login to Ecommerce2 application with "<user>" and "<pass>"
    Then Verify Error message is displayed
    Examples:
      | user                | pass        |
      | rahulshetty         | learning111 |
      | nany                | lolo |