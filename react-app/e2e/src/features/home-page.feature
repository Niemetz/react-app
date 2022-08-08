Feature: As a user I expect to be able to navigate to the home page

  @dev
  @smoke
  @regression
  Scenario: As a user I expect to be able to see contacts
    Given I am on the "home" page
    Then the "header logo" should be displayed
    And the "contacts header" should contain the text "Contacts"
    # When I create an object X with the following data

    #  | Field Name  | Field Value | Start Date/Time Needed | Start Date/Time  | End Date/Time    |
    #  | Country     | U.S.A       | true                   | 04/01/2022 0:0:0 | 05/01/2022 0:0:0 |
    #  | Name        | SpaceX-120  | true                   | 04/01/2022 0:0:0 | 05/01/2022 0:0:0 |

    