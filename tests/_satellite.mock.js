Object.defineProperty(window, "_satellite", {
  writable: true,
  value: {
    __satelliteLoaded: true,
    track: jest.fn().mockImplementation((event, data) => ({
      event: event,
      data: data,
    })),
  },
});

Object.defineProperty(window, "__satelliteLoaded", {
  writable: true,
  value: true
});

