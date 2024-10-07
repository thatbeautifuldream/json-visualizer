export const json_explanation = {
  status: true,
  data: {
    steps: [
      {
        explanation:
          "The JSON structure is a single object that contains three main keys at the top level: 'user', 'preferences', and 'recentOrders'.",
        output:
          '{"user":{"id":1,"name":"John Doe","email":"john@example.com","age":30,"isActive":true},"preferences":{"theme":"dark","notifications":{"email":true,"push":false}},"recentOrders":[{"orderId":"ORD-001","total":99.99,"items":["item1","item2"]},{"orderId":"ORD-002","total":149.99,"items":["item3","item4","item5"]}]}.',
      },
      {
        explanation:
          "The 'user' key maps to an object that contains information about a user.",
        output:
          '{"id":1,"name":"John Doe","email":"john@example.com","age":30,"isActive":true}',
      },
      {
        explanation:
          "Within the 'user' object, there are five keys: 'id', 'name', 'email', 'age', and 'isActive'.",
        output:
          '{"id":1,"name":"John Doe","email":"john@example.com","age":30,"isActive":true}',
      },
      {
        explanation:
          "The 'id' key has a value of 1, indicating the user's unique identifier.",
        output: '"id":1',
      },
      {
        explanation:
          "The 'name' key has a value of 'John Doe', representing the user's full name.",
        output: '"name":"John Doe"',
      },
      {
        explanation:
          "The 'email' key has a value of 'john@example.com', which is the user's email address.",
        output: '"email":"john@example.com"',
      },
      {
        explanation:
          "The 'age' key has a value of 30, indicating the user's age.",
        output: '"age":30',
      },
      {
        explanation:
          "The 'isActive' key has a value of true, suggesting that the user's account is currently active.",
        output: '"isActive":true',
      },
      {
        explanation:
          "The 'preferences' key maps to an object that contains user preferences.",
        output: '{"theme":"dark","notifications":{"email":true,"push":false}}',
      },
      {
        explanation:
          "Within the 'preferences' object, there are two keys: 'theme' and 'notifications'.",
        output: '{"theme":"dark","notifications":{"email":true,"push":false}}',
      },
      {
        explanation:
          "The 'theme' key has a value of 'dark', indicating the user's preferred theme setting.",
        output: '"theme":"dark"',
      },
      {
        explanation:
          "The 'notifications' key maps to another object that specifies notification preferences.",
        output: '{"email":true,"push":false}',
      },
      {
        explanation:
          "Within the 'notifications' object, there are two keys: 'email' and 'push'.",
        output: '{"email":true,"push":false}',
      },
      {
        explanation:
          "The 'email' key has a value of true, meaning the user wants to receive email notifications.",
        output: '"email":true',
      },
      {
        explanation:
          "The 'push' key has a value of false, indicating the user does not want to receive push notifications.",
        output: '"push":false',
      },
      {
        explanation:
          "The 'recentOrders' key maps to an array containing objects, each representing a recent order.",
        output:
          '[{"orderId":"ORD-001","total":99.99,"items":["item1","item2"]},{"orderId":"ORD-002","total":149.99,"items":["item3","item4","item5"]}]',
      },
      {
        explanation:
          "Each object in the 'recentOrders' array has three keys: 'orderId', 'total', and 'items'.",
        output: '{"orderId":"ORD-001","total":99.99,"items":["item1","item2"]}',
      },
      {
        explanation:
          "The 'orderId' key has a string value that uniquely identifies the order, such as 'ORD-001'.",
        output: '"orderId":"ORD-001"',
      },
      {
        explanation:
          "The 'total' key has a numeric value representing the total cost of the order, such as 99.99.",
        output: '"total":99.99',
      },
      {
        explanation:
          "The 'items' key maps to an array of strings, each representing an item included in the order.",
        output: '"items":["item1","item2"]',
      },
    ],
    summary:
      "This JSON structure represents a user's data with details about their identity, preferences, and recent orders. It includes nested objects and arrays to organize related information effectively.",
  },
};
