import axios from "axios";
import { Request, Response } from "express";

export const oAuthLogin = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    console.log(token);

    const google_response = await axios.get(
      "https://people.googleapis.com/v1/people/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          personFields: "emailAddresses,names,photos",
        },
      }
    );

    res.status(200).send({ data: google_response.data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "OAuth Login Failed" });
  }
};
