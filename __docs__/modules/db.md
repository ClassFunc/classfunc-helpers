[classfunc-helpers](../README.md) / [Exports](../modules.md) / db

# Namespace: db

## Table of contents

### Functions

- [batchSetAsync](db.md#batchsetasync)
- [batchUpdateAsync](db.md#batchupdateasync)

## Functions

### batchSetAsync

▸ **batchSetAsync**(`db`, `values`, `collectionPath`, `idField`, `setObject?`, `setOptions?`, `size?`): `Promise`<`unknown`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `db` | `object` | `undefined` |
| `values` | `any`[] | `undefined` |
| `collectionPath` | `string` | `undefined` |
| `idField` | `string` \| (`value`: `any`) => `string` | `undefined` |
| `setObject?` | (`value`: `any`) => `object` | `undefined` |
| `setOptions?` | `Object` | `undefined` |
| `setOptions.merge` | `boolean` | `true` |
| `size?` | `number` | `500` |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[db/index.ts:7](https://github.com/ClassFunc/classfunc-helpers/blob/e38191f/db/index.ts#L7)

___

### batchUpdateAsync

▸ **batchUpdateAsync**(`db`, `values`, `collectionPath`, `idField`, `updateObject?`, `size?`): `Promise`<`unknown`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `db` | `object` | `undefined` |
| `values` | `any`[] | `undefined` |
| `collectionPath` | `string` | `undefined` |
| `idField` | `string` \| (`value`: `any`) => `string` | `undefined` |
| `updateObject?` | (`value`: `any`) => `object` | `undefined` |
| `size?` | `number` | `500` |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[db/index.ts:45](https://github.com/ClassFunc/classfunc-helpers/blob/e38191f/db/index.ts#L45)
