const { isEmpty } = require("../sharedFunction/authShared");

const storeIdValidatorByParams = async (ctx) => {
  const { storeId } = ctx.params;
  const emptyError = isEmpty(storeId, "storeId");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    storeId,
  };
  return null;
};

const storeNameValidator = async (ctx) => {
  const { storeName } = ctx.request.body;
  const emptyError = isEmpty(storeName, "storeName");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    storeName,
  };
  return null;
};

const ownerNameValidator = async (ctx) => {
  const { ownerName } = ctx.request.body;
  const emptyError = isEmpty(ownerName, "ownerName");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    ownerName,
  };
  return null;
};

const openTimeValidator = async (ctx) => {
  const { openTime } = ctx.request.body;
  const emptyError = isEmpty(openTime, "openTime");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    openTime,
  };
  return null;
};

const closeTimeValidator = async (ctx) => {
  const { closeTime } = ctx.request.body;
  const emptyError = isEmpty(closeTime, "closeTime");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    closeTime,
  };
  return null;
};

const addressValidator = async (ctx) => {
  const { address } = ctx.request.body;
  const emptyError = isEmpty(address, "address");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    address,
  };
  return null;
};

const descriptionValidator = async (ctx) => {
  const { description } = ctx.request.body;
  const emptyError = isEmpty(description, "description");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    description,
  };
  return null;
};

const categoryValidator = async (ctx) => {
  const { category } = ctx.request.body;
  const emptyError = isEmpty(category, "category");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    category,
  };
  return null;
};

const mediaLinksValidator = async (ctx) => {
  const { mediaLinks } = ctx.request.body;
  const emptyError = isEmpty(mediaLinks, "mediaLinks");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    mediaLinks,
  };
  return null;
};

const gstNumberValidator = async (ctx) => {
  const { gstNumber } = ctx.request.body;
  const emptyError = isEmpty(gstNumber, "gstNumber");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    gstNumber,
  };
  return null;
};

const isBranchValidator = async (ctx) => {
  const { isBranch } = ctx.request.body;
  const emptyError = isEmpty(isBranch, "isBranch");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    isBranch,
  };
  return null;
};

const upiIdValidator = async (ctx) => {
  const { upiId } = ctx.request.body;
  const emptyError = isEmpty(upiId, "upiId");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    upiId,
  };
  return null;
};

const updatedValidator = async (ctx) => {
  const updatedData = ctx.request.body;
  const emptyError = isEmpty(updatedData);
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    updatedData,
  };
  return null;
};

module.exports = {
  storeIdValidatorByParams,
  ownerNameValidator,
  storeNameValidator,
  openTimeValidator,
  closeTimeValidator,
  upiIdValidator,
  isBranchValidator,
  gstNumberValidator,
  mediaLinksValidator,
  categoryValidator,
  descriptionValidator,
  addressValidator,
  updatedValidator,
};
