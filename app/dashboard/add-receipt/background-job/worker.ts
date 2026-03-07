import { Worker, Queue } from "bullmq";
import { Redis } from "ioredis";

const connection = new Redis(
  "rediss://default:AUJ4AAIncDFjYjY4MWVhYThmZDQ0M2JlYmFlYmU2ZWQ2YjA2YTc2OXAxMTcwMTY@thorough-chicken-17016.upstash.io:6379",
  {
    maxRetriesPerRequest: null,
  },
);

const checkExtractionResultQueue = new Queue("check-for-extraction-result", {
  connection,
});

type Status = "PENDING" | "SUCCESS" | "ERROR" | "PARTIAL_SUCCESS" | "CANCELLED";

const worker = new Worker(
  "check-for-extraction-result",
  async (job) => {
    try {
      console.log("Job details:", job.data);

      const response = await fetch(
        `https://api.cloud.llamaindex.ai/api/v1/extraction/jobs/${job.data.extractionJobId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer llx-RczZhi4VeOtmOqm6s1JeuQ8JxEoLwgPlLMbbWiPY6CawBKRT`,
          },
        },
      );

      if (!response.ok) {
        console.error("Error polling extraction job:", await response.text());
        throw new Error("Failed to poll extraction job status");
      }

      const result = await response.json();
      const { status }: { status: Status } = result;

      if (status === "PENDING" || status === "PARTIAL_SUCCESS") {
        console.log(
          `status is ${status}, polling again in 3 seconds`,
          job.data,
        );
        return await checkExtractionResultQueue.add(
          job.name,
          job.data,
          { delay: 3000 }, // Poll again in 3 seconds
        );
      }

      if (status === "SUCCESS") {
        // call the backend
        console.log("extraction success, call the backend");
       const res = await fetch("http://localhost:3000/api/receipts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobId: job.data.extractionJobId,
            userId: job.data.userId,
          }),
        });
        const data = await res.json();
        console.log("extraction success, called the backend!!!", data);
      }
      checkExtractionResultQueue.drain()
    } catch (error) {
      console.error("Error in worker:", error);
    }
  },
  { connection },
);

// worker.on("completed", (job) => {
//   console.log(`${job.id} has completed!`);
// });

// worker.on("failed", (job, err) => {
//   console.log(`${job?.id} has failed with ${err.message}`);
// });

// // async function addJobs() {
// //   await myQueue.add("myJobName", { foo: "bar" });
// //   // await myQueue.add("myJobName", { qux: "baz" });
// // }

// // await addJobs();


// const res = await fetch("http://localhost:3000/api/receipts", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   // body: JSON.stringify({
//   //   jobId: "2cdebd46-4be9-4d21-a98e-514273efd5b6",
//   //   userId: "4568ae7e-7987-4a99-962c-a6d267b36f91",
//   // }),
// });

// const data = await res.json();
// console.log("extraction success, called the backend!!!", data);