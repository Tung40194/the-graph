import { BigInt } from "@graphprotocol/graph-ts"
import {
  manOfBinary,
  createContract
} from "../generated/manOfBinary/manOfBinary"
import { contractDeployment } from "../generated/schema"

export function handlecreateContract(event: createContract): void {
  let entity = contractDeployment.load(event.address)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new contractDeployment(event.address)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.name = event.params.name
  entity.symbol = event.params.symbol

  // Entities can be written to the store with `.save()`
  entity.save()
}
