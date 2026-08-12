import {
  createWorkflow,
  WorkflowResponse,
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { BRAND_MODULE } from "../modules/brand"
import BrandModuleService from "../modules/brand/service"

type CreateBrandInput = {
  name: string
}

const createBrandStep = createStep(
  "create-brand",
  async (input: CreateBrandInput, { container }) => {
    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE)

    const brand = await brandModuleService.createBrands(input)

    return new StepResponse(brand, brand.id)
  },
  async (brandId, { container }) => {
    if (!brandId) {
      return
    }

    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE)

    await brandModuleService.deleteBrands([brandId])
  }
)

export const createBrandWorkflow = createWorkflow(
  "create-brand",
  (input: CreateBrandInput) => {
    const brand = createBrandStep(input)

    return new WorkflowResponse({
      brand,
    })
  }
)
