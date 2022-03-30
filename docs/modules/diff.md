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

[diffHelper.ts:11](https://github.com/ClassFunc/classfunc-helpers/blob/54c3f24/src/diffHelper.ts#L11)

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

[diffHelper.ts:109](https://github.com/ClassFunc/classfunc-helpers/blob/54c3f24/src/diffHelper.ts#L109)

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

[diffHelper.ts:108](https://github.com/ClassFunc/classfunc-helpers/blob/54c3f24/src/diffHelper.ts#L108)

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

[diffHelper.ts:27](https://github.com/ClassFunc/classfunc-helpers/blob/54c3f24/src/diffHelper.ts#L27)

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

[diffHelper.ts:51](https://github.com/ClassFunc/classfunc-helpers/blob/54c3f24/src/diffHelper.ts#L51)

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

[diffHelper.ts:81](https://github.com/ClassFunc/classfunc-helpers/blob/54c3f24/src/diffHelper.ts#L81)

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

[diffHelper.ts:89](https://github.com/ClassFunc/classfunc-helpers/blob/54c3f24/src/diffHelper.ts#L89)
