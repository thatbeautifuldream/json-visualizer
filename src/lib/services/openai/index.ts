// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   apiKey: "sk-proj-xxxxx",
//   json: {
//     user: {
//       id: 1,
//       name: "John Doe",
//       email: "john@example.com",
//       age: 30,
//       isActive: true,
//     },
//     preferences: {
//       theme: "dark",
//       notifications: {
//         email: true,
//         push: false,
//       },
//     },
//     recentOrders: [
//       {
//         orderId: "ORD-001",
//         total: 99.99,
//         items: ["item1", "item2"],
//       },
//       {
//         orderId: "ORD-002",
//         total: 149.99,
//         items: ["item3", "item4", "item5"],
//       },
//     ],
//   },
// });

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
// };

// fetch("http://localhost:3000/api/openai", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

type ExplainJsonResponse = {
  status: boolean;
  data: {
    summary: string;
    steps: {
      explanation: string;
      output: string;
    }[];
  };
};

export async function explainJson({
  apiKey,
  jsonData,
}: {
  apiKey: string;
  jsonData: any;
}): Promise<ExplainJsonResponse> {
  const raw = JSON.stringify({
    apiKey,
    json: jsonData,
  });

  const response = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
  });
  return response.json();
}
