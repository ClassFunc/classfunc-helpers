[classfunc-helpers](../README.md) / [Exports](../modules.md) / db

# Namespace: db

## Table of contents

### Functions

- [batchSetAsync](db.md#batchsetasync)

## Functions

### batchSetAsync

▸ **batchSetAsync**(`db`, `values`, `collectionPath`, `docIdField`, `setValueFunc`, `setOptions?`, `size?`): `Promise`<`unknown`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `db` | `object` | `undefined` |
| `values` | `any`[] | `undefined` |
| `collectionPath` | `string` | `undefined` |
| `docIdField` | `string` \| `Function` | `undefined` |
| `setValueFunc` | `undefined` \| ``null`` \| `Function` | `undefined` |
| `setOptions` | `object` | `undefined` |
| `size` | `number` | `500` |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[dbHelper.ts:7](https://github.com/ClassFunc/classfunc-helpers/blob/89cfff2/src/dbHelper.ts#L7)
