[classfunc-helpers](../README.md) / [Exports](../modules.md) / diff

# Namespace: diff

## Table of contents

### Interfaces

- [IDiffObject](../interfaces/diff.IDiffObject.md)

### Type aliases

- [IKind](diff.md#ikind)

### Functions

- [diffAfterBefore](diff.md#diffafterbefore)
- [diffBeforeAfter](diff.md#diffbeforeafter)
- [diffExplain](diff.md#diffexplain)
- [diffObjects](diff.md#diffobjects)
- [diffValues](diff.md#diffvalues)
- [difference](diff.md#difference)

## Type aliases

### IKind

Ƭ **IKind**: ``"N"`` \| ``"D"`` \| ``"E"`` \| ``"A"``

#### Defined in

[diff/index.ts:16](https://github.com/ClassFunc/classfunc-helpers/blob/0f01313/diff/index.ts#L16)

## Functions

### diffAfterBefore

▸ **diffAfterBefore**(`after`, `before`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `after` | `any` |
| `before` | `any` |

#### Returns

`unknown`

#### Defined in

[diff/index.ts:114](https://github.com/ClassFunc/classfunc-helpers/blob/0f01313/diff/index.ts#L114)

___

### diffBeforeAfter

▸ **diffBeforeAfter**(`before`, `after`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `before` | `any` |
| `after` | `any` |

#### Returns

`unknown`

#### Defined in

[diff/index.ts:113](https://github.com/ClassFunc/classfunc-helpers/blob/0f01313/diff/index.ts#L113)

___

### diffExplain

▸ **diffExplain**(`before`, `after?`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `before` | `object` |
| `after?` | `object` |

#### Returns

`string`[]

#### Defined in

[diff/index.ts:32](https://github.com/ClassFunc/classfunc-helpers/blob/0f01313/diff/index.ts#L32)

___

### diffObjects

▸ **diffObjects**(`before`, `after?`, `identities?`): [`IDiffObject`](../interfaces/diff.IDiffObject.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `before` | `any` |
| `after?` | `any` |
| `identities?` | `string`[] |

#### Returns

[`IDiffObject`](../interfaces/diff.IDiffObject.md)[]

#### Defined in

[diff/index.ts:56](https://github.com/ClassFunc/classfunc-helpers/blob/0f01313/diff/index.ts#L56)

___

### diffValues

▸ **diffValues**(`before`, `after?`, `identities?`): [`IDiffObject`](../interfaces/diff.IDiffObject.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `before` | `any` |
| `after?` | `any` |
| `identities?` | `string`[] |

#### Returns

[`IDiffObject`](../interfaces/diff.IDiffObject.md)[]

#### Defined in

[diff/index.ts:86](https://github.com/ClassFunc/classfunc-helpers/blob/0f01313/diff/index.ts#L86)

___

### difference

▸ **difference**(`after`, `before?`): `unknown`

Deep diff between two after, using lodash

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `after` | `object` | Object compared |
| `before?` | `object` | Object to compare with |

#### Returns

`unknown`

Return a new after who represent the diff

#### Defined in

[diff/index.ts:94](https://github.com/ClassFunc/classfunc-helpers/blob/0f01313/diff/index.ts#L94)
