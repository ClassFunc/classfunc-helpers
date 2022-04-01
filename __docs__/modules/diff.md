[classfunc-helpers](../README.md) / [Exports](../modules.md) / diff

# Namespace: diff

## Table of contents

### Interfaces

- [IDiffObject](../interfaces/diff.IDiffObject.md)

### Type aliases

- [IKind](diff.md#ikind)

### Functions

- [diff2](diff.md#diff2)
- [diffAfterBefore](diff.md#diffafterbefore)
- [diffBeforeAfter](diff.md#diffbeforeafter)
- [difference](diff.md#difference)

## Type aliases

### IKind

Ƭ **IKind**: ``"N"`` \| ``"D"`` \| ``"E"`` \| ``"A"``

#### Defined in

[diff/index.d.ts:1](https://github.com/ClassFunc/classfunc-helpers/blob/7f22d1a/diff/index.d.ts#L1)

## Functions

### diff2

▸ **diff2**(`before`, `after?`, `pickFields?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `before` | `any` |
| `after?` | `any` |
| `pickFields?` | `string`[] |

#### Returns

`Object`

#### Defined in

[diff/index.d.ts:14](https://github.com/ClassFunc/classfunc-helpers/blob/7f22d1a/diff/index.d.ts#L14)

___

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

[diff/index.d.ts:17](https://github.com/ClassFunc/classfunc-helpers/blob/7f22d1a/diff/index.d.ts#L17)

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

[diff/index.d.ts:16](https://github.com/ClassFunc/classfunc-helpers/blob/7f22d1a/diff/index.d.ts#L16)

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

[diff/index.d.ts:15](https://github.com/ClassFunc/classfunc-helpers/blob/7f22d1a/diff/index.d.ts#L15)
