import { BigInt } from "@graphprotocol/graph-ts"
import {
  createContract
} from "../generated/manOfBinary/manOfBinary"

import {
  Account,
	ERC721Transfer,
  ERC721Contract,
} from '../../node_modules/@openzeppelin/subgraphs/generated/schema' 

import {
	IERC721,
} from '../../node_modules/@openzeppelin/subgraphs/generated/erc721/IERC721'

import {
	Approval       as ApprovalEvent,
	ApprovalForAll as ApprovalForAllEvent,
	Transfer       as TransferEvent,
} from '../../node_modules/@openzeppelin/subgraphs/generated/erc721/IERC721'

import {
	events,
	transactions,
} from '@amxx/graphprotocol-utils'

import {
	fetchAccount,
} from '../../node_modules/@openzeppelin/subgraphs/src/fetch/account'

import {
	fetchERC721,
	fetchERC721Token,
	fetchERC721Operator,
} from '../../node_modules/@openzeppelin/subgraphs/src/fetch/erc721'

import {
	supportsInterface,
} from '../../node_modules/@openzeppelin/subgraphs/src/fetch/erc165'


export function handlecreateContract(event: createContract): void {
	let erc721           = IERC721.bind(event.address)

  let account          = new Account(event.address.toHex())
	account.save()

	let detectionId      = account.id.concat('/erc721detection')
	let detectionAccount = Account.load(detectionId)

	if (detectionAccount == null) {
		detectionAccount = new Account(detectionId)
		let introspection_01ffc9a7 = supportsInterface(erc721, '01ffc9a7') // ERC165
		let introspection_80ac58cd = supportsInterface(erc721, '80ac58cd') // ERC721
		let introspection_00000000 = supportsInterface(erc721, '00000000', false)
		let isERC721               = introspection_01ffc9a7 && introspection_80ac58cd && introspection_00000000
		detectionAccount.asERC721  = isERC721 ? account.id : null
		detectionAccount.save()
	}

	if (detectionAccount.asERC721 != null) {
		let contract = ERC721Contract.load(account.id)

		if (contract == null) {
			contract                  = new ERC721Contract(account.id)
			contract.name             = event.params.name
			contract.symbol           = event.params.symbol
			contract.supportsMetadata = supportsInterface(erc721, '5b5e139f') // ERC721Metadata
			contract.asAccount        = account.id
			account.asERC721          = account.id
			contract.save()
			account.save()
		}
	}
}
