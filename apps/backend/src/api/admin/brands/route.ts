import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createBrandWorkflow } from "../../../workflows/create-brand"

type PostAdminCreateBrandBody = {
  name: string
}

export async function POST(
  req: MedusaRequest<PostAdminCreateBrandBody>,
  res: MedusaResponse
) {
  const { result } = await createBrandWorkflow(req.scope).run({
    input: req.body,
  })

  res.send(result)
}
