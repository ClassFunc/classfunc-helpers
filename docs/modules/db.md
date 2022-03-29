[classfunc-helpers](../README.md) / [Exports](../modules.md) / db

# Namespace: db

## Table of contents

### Functions

- [batchSetAsync](db.md#batchsetasync)

## Functions

### batchSetAsync

▸ **batchSetAsync**(`db`, `values`, `collectionPath`, `docIdField`, `size?`, `setOptions?`): `Promise`<`unknown`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `db` | `object` | `undefined` |
| `values` | `any`[] | `undefined` |
| `collectionPath` | `string` | `undefined` |
| `docIdField` | `string` \| `Function` | `undefined` |
| `size` | `number` | `500` |
| `setOptions` | `object` | `undefined` |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[dbHelper.ts:7](https://github.com/ClassFunc/classfunc-helpers/blob/b5f96a0/src/dbHelper.ts#L7)
