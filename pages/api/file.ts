// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { x, y, cs, grid } = req.body 

    let fileString = `${x} ${y} ${cs}\n`

    for ( let j = 0; j < y; j++ ) {     
        for ( let i = 0; i < x; i++ ) {
            fileString += `${grid[i][j] ? "1" : "0"}`
            if ( i < x - 1 ) {
                fileString += " "
            }
        }
        fileString += "\n"
    }

    console.log(fileString)
    res.setHeader('Content-Type', 'text/plain'); 
    res.setHeader('Content-Disposition', 'attachment; filename=map.txt');
    res.status(200).send(fileString);
}
