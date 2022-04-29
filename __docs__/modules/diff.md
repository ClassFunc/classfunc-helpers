[classfunc-helpers](../README.md) / [Exports](../modules.md) / diff

# Namespace: diff

## Table of contents

### Interfaces

- [IDiffObject](../interfaces/diff.IDiffObject.md)

### Type aliases

- [IKind](diff.md#ikind)

### Functions

- [diff2](diff.md#diff2)
- [diffObjects](diff.md#diffobjects)
- [diffValues](diff.md#diffvalues)

## Type aliases

### IKind

Ƭ **IKind**: ``"N"`` \| ``"D"`` \| ``"E"`` \| ``"A"``

#### Defined in

[diff/index.d.ts:1](https://github.com/ClassFunc/classfunc-helpers/blob/2663593/diff/index.d.ts#L1)

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

[diff/index.d.ts:14](https://github.com/ClassFunc/classfunc-helpers/blob/2663593/diff/index.d.ts#L14)

___

### diffObjects

▸ **diffObjects**(`before`, `after?`, `pickFields?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `before` | `any` |
| `after?` | `any` |
| `pickFields?` | `string`[] |

#### Returns

`Object`

#### Defined in

[diff/index.d.ts:15](https://github.com/ClassFunc/classfunc-helpers/blob/2663593/diff/index.d.ts#L15)

___

### diffValues

▸ **diffValues**(`before`, `after?`, `pickFields?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `before` | `any` |
| `after?` | `any` |
| `pickFields?` | `string`[] |

#### Returns

`Object`

#### Defined in

[diff/index.d.ts:16](https://github.com/ClassFunc/classfunc-helpers/blob/2663593/diff/index.d.ts#L16)
