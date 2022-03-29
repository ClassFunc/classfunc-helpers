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

[diffHelper.ts:7](https://github.com/ClassFunc/classfunc-helpers/blob/c94dca1/src/diffHelper.ts#L7)

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

[diffHelper.ts:88](https://github.com/ClassFunc/classfunc-helpers/blob/c94dca1/src/diffHelper.ts#L88)

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

[diffHelper.ts:87](https://github.com/ClassFunc/classfunc-helpers/blob/c94dca1/src/diffHelper.ts#L87)

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

[diffHelper.ts:23](https://github.com/ClassFunc/classfunc-helpers/blob/c94dca1/src/diffHelper.ts#L23)

___

### diffObjects

▸ **diffObjects**(`before`, `after?`, `toPlainObject?`): [`IDiffObject`](../interfaces/diff.IDiffObject.md)[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `before` | `any` | `undefined` |
| `after?` | `any` | `undefined` |
| `toPlainObject` | `boolean` | `true` |

#### Returns

[`IDiffObject`](../interfaces/diff.IDiffObject.md)[]

#### Defined in

[diffHelper.ts:47](https://github.com/ClassFunc/classfunc-helpers/blob/c94dca1/src/diffHelper.ts#L47)

___

### diffValues

▸ **diffValues**(`before`, `after?`, `toPlainObject?`): [`IDiffObject`](../interfaces/diff.IDiffObject.md)[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `before` | `any` | `undefined` |
| `after?` | `any` | `undefined` |
| `toPlainObject` | `boolean` | `true` |

#### Returns

[`IDiffObject`](../interfaces/diff.IDiffObject.md)[]

#### Defined in

[diffHelper.ts:60](https://github.com/ClassFunc/classfunc-helpers/blob/c94dca1/src/diffHelper.ts#L60)

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

[diffHelper.ts:68](https://github.com/ClassFunc/classfunc-helpers/blob/c94dca1/src/diffHelper.ts#L68)
