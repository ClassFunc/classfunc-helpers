[classfunc-helpers](../README.md) / [Exports](../modules.md) / diff

# Namespace: diff

## Table of contents

### Functions

- [diffExplain](diff.md#diffexplain)
- [diffObjects](diff.md#diffobjects)
- [difference](diff.md#difference)

## Functions

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

[diffHelper.ts:23](https://github.com/ClassFunc/classfunc-helpers/blob/df13716/src/diffHelper.ts#L23)

___

### diffObjects

▸ **diffObjects**(`before`, `after?`): `IDiffObject`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `before` | `object` |
| `after?` | `object` |

#### Returns

`IDiffObject`[]

#### Defined in

[diffHelper.ts:47](https://github.com/ClassFunc/classfunc-helpers/blob/df13716/src/diffHelper.ts#L47)

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

[diffHelper.ts:58](https://github.com/ClassFunc/classfunc-helpers/blob/df13716/src/diffHelper.ts#L58)
