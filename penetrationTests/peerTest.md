# Penetration Test Report
Partner 1: Alec Davis
Partner 2: Jaquelyn Guernsey

## Self Attack

### Alec Davis
|    Item      |  Result    |
|--------------|------------|
|Date          | Dec 8, 2024|
|Target        | pizza.ki11errabbit.xyz|
|Classification| Injection|
|Severity      | 4|
|Description   | Unable to delete all tables|
|Corrections   | NA |

|    Item      |  Result    |
|--------------|------------|
|Date          | Dec 10, 2024|
|Target        | pizza.ki11errabbit.xyz|
|Classification| Impersonation|
|Severity      | 4|
|Description   | Unable to inpersonate another user|
|Corrections   | NA |

### Jaquelyn Guernsey

|    Item      |  Result    |
|--------------|------------|
|Date          | Dec 10, 2024|
|Target        | pizza.boospace.click|
|Classification| Impersonation|
|Severity      | 4|
|Description   | Could login with any email, even one already in system, just made a new account with new password (cannot login with new information though)|
|Corrections   | Validate emails before allowing account creation |

|    Item      |  Result    |
|--------------|------------|
|Date          | Dec 10, 2024|
|Target        | pizza.boospace.click|
|Classification| Data Validation|
|Severity      | 3|
|Description   | Modification of HTTP requests allows for price of pizza to be changed based on user input, allows for negative values|
|Images        | See image `PenTest.png` for screenshot where 3 orders have been made, each with a different price. Internally these were all orders for the same pizzas|
|Corrections   | Have prices set when order is committed to database based on retrieved val instead of passed in one|

## Peer Attack

### Alec Davis

None listed due to no success in the above attacks

### Jaquelyn Guernsey

|    Item      |  Result    |
|--------------|------------|
|Date          | Dec 10, 2024|
|Target        | pizza.ki11errabbit.xyz|
|Classification| Impersonation|
|Severity      | 4|
|Description   | Could login with any email, even one already in system, just made a new account with new password (cannot login with new information though), unable to verify if access can be gained to original account due to lack of order history|
|Corrections   | Validate emails before allowing accound creation|

|    Item      |  Result    |
|--------------|------------|
|Date          | Dec 10, 2024|
|Target        | pizza.ki11errabbit.xyz|
|Classification| Data Validation|
|Severity      | 3|
|Description   | Modification of HTTP requests allows for price of pizza to be changed based on user input, allows for negative values, unable to verify persistability due to lack of order history|
|Corrections   | Have prices set when order is committed to database based on retrieved val instead of passed in one|

## Summary of Learnings

### Alec Davis

I learned that programmers are only told what not to do and why when it comes to security but not how to exploit that security hole. I don't think any of the instruction properly prepared me for this deliverable. Even my partner who took a security class about web technology couldn't initially find anything out of the ordinary. This could be from my inexperience with JavaScript.

### Jaquelyn Guernsey
My partner and I worked together in order to try to find exploits, and even then I was only able to find a couple, and only after a long time of testing. We had a list of possible vulnerabilities we both tried, and we still ended up with different attack reports in the end. Taking a security class at the same time, I was still unable to find several of the vulnerabilities myself. When looking for vulnerabilities with very little direction, it's much harder to find gaps in security than when I'm given some possible things to try. 