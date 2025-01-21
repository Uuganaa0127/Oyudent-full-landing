// import type { NextApiRequest, NextApiResponse } from 'next';

// // Define the data structure for the response
// type Data = {
//   message: string;
//   data?: string[];
//   newItem?: string;
//   error?: string;
// };

// export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   const { method } = req;

//   switch (method) {
//     case 'GET':
//       // Respond with some sample data
//       res.status(200).json({ message: 'Hello from the API!', data: ['Item 1', 'Item 2', 'Item 3'] });
//       break;

//     case 'POST':
//       const { item } = req.body;

//       if (item) {
//         res.status(201).json({ message: 'Item added successfully!', newItem: item });
//       } else {
//         res.status(400).json({ error: 'Missing item in request body' });
//       }
//       break;

//     default:
//       // Handle unsupported methods
//       res.setHeader('Allow', ['GET', 'POST']);
//       res.status(405).json({ error: `Method ${method} Not Allowed` });
//   }
// }
