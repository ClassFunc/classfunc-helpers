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

[diff/index.d.ts:1](https://github.com/ClassFunc/classfunc-helpers/blob/91c88bc/diff/index.d.ts#L1)

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

[diff/index.d.ts:19](https://github.com/ClassFunc/classfunc-helpers/blob/91c88bc/diff/index.d.ts#L19)

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

[diff/index.d.ts:18](https://github.com/ClassFunc/classfunc-helpers/blob/91c88bc/diff/index.d.ts#L18)

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

[diff/index.d.ts:14](https://github.com/ClassFunc/classfunc-helpers/blob/91c88bc/diff/index.d.ts#L14)

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

[diff/index.d.ts:15](https://github.com/ClassFunc/classfunc-helpers/blob/91c88bc/diff/index.d.ts#L15)

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

[diff/index.d.ts:16](https://github.com/ClassFunc/classfunc-helpers/blob/91c88bc/diff/index.d.ts#L16)

___

### difference

▸ **difference**(`after`, `before?`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `after` | `object` |
| `before?` | `object` |

#### Returns

`unknown`

#### Defined in

[diff/index.d.ts:17](https://github.com/ClassFunc/classfunc-helpers/blob/91c88bc/diff/index.d.ts#L17)
